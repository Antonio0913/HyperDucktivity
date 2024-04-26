import React, { useState } from "react";

function Task({ title, content }) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl border border-beak-orange overflow-hidden md:max-w-2xl m-5">
      <div className="md:flex">
        <div className="p-4">
          <div className="uppercase tracking-wide text-sm text-beak-orange font-semibold">{title}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{content}</p>
        </div>
      </div>
    </div>
    );
  }

export default Task;