import React from "react";

interface FormSectionProps {
  section: {
    id: string;
    type: string;
    content: { [key: string]: string };
  };
  onUpdate: (id: string, content: { [key: string]: string }) => void;
  onDelete: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({ section, onUpdate, onDelete }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(section.id, { ...section.content, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
      <h3>{section.type}</h3>
      {Object.keys(section.content).map((key) => (
        <div key={key}>
          <label>
            {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
            <input
              type="text"
              name={key}
              value={section.content[key]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default FormSection;
