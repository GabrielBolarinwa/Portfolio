"use client";
import React from "react";
import Tool from "./Tool";
import { tools } from "@/src/constants/about";

function ToolList() {
  return (
    <ul className="mt-10 flex flex-wrap gap-4">
      {tools.map((tool, index) => (
        <Tool tool={tool} index={index} key={tool.tool} />
      ))}
    </ul>
  );
}

export default ToolList;
