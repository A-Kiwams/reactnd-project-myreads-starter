import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

export const LIST_OPTIONS = [
    {
      value: "move",
      label: "Move to...",
      disabled: true,
    },
    {
      value: "currentlyReading",
      label: "Currently Reading",
      toShow: true,
    },
    {
      value: "wantToRead",
      label: "Want to Read",
      toShow: true,
    },
    {
      value: "read",
      label: "Read",
      toShow: true,
    },
    {
      value: "none",
      label: "None",
    },
  ];