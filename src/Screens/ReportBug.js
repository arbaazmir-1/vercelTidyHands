import React from "react";
import NavbarMobile from "../ components/NavbarMobile";
import {
  Grid,
  GridItem,
  FormControl,
  Input,
  FormLabel,
  Center,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reportBugAction } from "../actions/homepageAction";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const ReportBug = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { userInfo } = userLogin;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const report = useSelector((state) => state.report);
  const { loading, success, error } = report;

  const sendReport = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(reportBugAction(title, description, userInfo.token));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <>
      <NavbarMobile />

      <Grid margin={2} gap={3}>
        <GridItem>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2}>Success!</AlertTitle>
              <AlertDescription>Report sent successfully</AlertDescription>
            </Alert>
          )}
        </GridItem>
        <form>
          <GridItem>
            <FormControl id="Title">
              <FormLabel>Title of the report</FormLabel>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="Description">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <Button
              width="full"
              type="submit"
              marginTop={3}
              colorScheme="teal"
              onClick={sendReport}
              disabled={loading}
            >
              {" "}
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <i className="fa fa-circle-o-notch"></i>
                </div>
              )}
              Submit
            </Button>
          </GridItem>
        </form>
      </Grid>
    </>
  );
};

export default ReportBug;
