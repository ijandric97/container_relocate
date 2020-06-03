import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Dropdown from "../../components/Dropdown/Dropdown";
import Problem from "../../components/Problem/Problem";
import "./ProblemsPage.css";

// TODO: Make this work with actual data
import { dummy_problems } from "../../util/dummydata";

const ProblemsPage: React.FC<any> = () => {
  const [loaded, setLoaded] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="problems"
    >
      <div className="problems__selector">
        <label className="problems__label">Rows:</label>
        <Dropdown
          placeholder={3}
          value={rows}
          onChange={v => setRows(v)}
          options={[3, 4, 5]}
        />
        <label className="problems__label">Columns:</label>
        <Dropdown
          placeholder={3}
          value={cols}
          onChange={v => setCols(v)}
          options={[3, 4, 5]}
        />
      </div>
      <div className="problems_flex">
        {dummy_problems.map((problem, index) => (
          <div className="problems__flexitem">
            <Problem problem={problem} num={index} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProblemsPage;
