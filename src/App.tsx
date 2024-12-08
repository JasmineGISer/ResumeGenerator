import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import FormSection from "./components/FormSection";
import PreviewSection from "./components/PreviewSection";
import SortableItem from "./components/SortableItem";

interface SectionData {
  id: string;
  type: string;
  content: { [key: string]: string };
}

const initialSections: SectionData[] = [
  {
    id: "education-1",
    type: "Education",
    content: { institution: "", degree: "", startDate: "", endDate: "" },
  },
  {
    id: "experience-1",
    type: "Working Experience",
    content: { company: "", role: "", startDate: "", endDate: "" },
  },
];

const App: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>(initialSections);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((items) => arrayMove(items, items.findIndex(i => i.id === active.id), items.findIndex(i => i.id === over.id)));
    }
  };

  const updateSection = (id: string, content: { [key: string]: string }) => {
    setSections((prev) => prev.map((section) => (section.id === id ? { ...section, content } : section)));
  };

  const addSection = (type: string) => {
    const newSection: SectionData = {
      id: `${type.toLowerCase().replace(" ", "-")}-${Date.now()}`,
      type,
      content: { startDate: "", endDate: "", ...(type === "Education" ? { institution: "", degree: "" } : { company: "", role: "" }) },
    };
    setSections((prev) => [...prev, newSection]);
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto", borderRight: "1px solid #ccc" }}>
        <h2>Form</h2>
        <div>
          <label>
            Name: <input type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
          </label>
          <label>
            Email: <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          </label>
          <label>
            Phone: <input type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </label>
        </div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map((section) => (
              <SortableItem key={section.id} id={section.id}>
                <FormSection
                  section={section}
                  onUpdate={updateSection}
                  onDelete={() => deleteSection(section.id)}
                />
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
        <button onClick={() => addSection("Education")}>Add Education</button>
        <button onClick={() => addSection("Working Experience")}>Add Experience</button>
      </div>
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <h2>Preview</h2>
        <PreviewSection contact={contact} sections={sections} />
      </div>
    </div>
  );
};

export default App;
