import React from "react";
import { CDBNotification, CDBContainer } from "cdbreact";
export const Notification = () => {
  return (
    <CDBContainer className="position-relative" show >
            <CDBNotification
              show
              fade
              title="Contrast"
              message="Hello, world! This is a positioned notification."
              text="11 mins ago"
              position="top-right"
            />
            <CDBNotification
              show
              fade
              title="Contrast"
              message="Hello, world! This is a positioned notification."
              text="11 mins ago"
              position="top-right"
            />
    </CDBContainer>
  );
};