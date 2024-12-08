import React from "react";

interface PreviewSectionProps {
  contact: { name: string; email: string; phone: string };
  sections: {
    id: string;
    type: string;
    content: { [key: string]: string };
  }[];
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ contact, sections }) => (
  <div>
    <h3>
      <b>{contact.name}</b>
    </h3>
    <p>{contact.email}</p>
    <p>{contact.phone}</p>
    {sections.map((section) => (
      <div key={section.id} style={{ marginBottom: "1rem" }}>
        <h4 style={{ textDecoration: "underline", fontWeight: "bold" }}>{section.type}</h4>
        <div>
          {Object.keys(section.content).map((key) => (
            <p key={key}>
              {key}: {section.content[key]}{" "}
              {key === "endDate" && <span style={{ float: "right" }}>{section.content[key]}</span>}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default PreviewSection;
