import React from "react";

import {
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

export default function WMTNavbar() {
  return (
    <div>
      <Navbar className="bp3-dark">
        <NavbarGroup align="left">
          <NavbarHeading>Web Management Tools</NavbarHeading>
          <NavbarDivider></NavbarDivider>
          <Button
            className="bp3-minimal"
            icon="antenna"
            text="URL Status Checker"
            active={true}
          ></Button>
        </NavbarGroup>
      </Navbar>
    </div>
  );
}
