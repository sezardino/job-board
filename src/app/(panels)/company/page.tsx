"use client";

import { WysiwygEditor } from "@/components/UI/WysiwygEditor/WysiwygEditor";
import { useState } from "react";

const CompanyHomePage = () => {
  const [state, setState] = useState("");

  return (
    <main>
      <h1>Company</h1>

      <WysiwygEditor model={state} onModelChange={setState} />

      <pre>{JSON.stringify(state)}</pre>
    </main>
  );
};

export default CompanyHomePage;
