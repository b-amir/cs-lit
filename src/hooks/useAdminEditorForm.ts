import { useUpdateItem } from "./useUpdateItem";

export function useAdminEditorForm(input, setInput, setShown) {
  const updateItem = useUpdateItem(input.item, input.type);

  const handleSave = (e) => {
    e.preventDefault();
    setShown(false);
    updateItem();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInput((prev) => ({
      ...prev,
      item: {
        ...prev.item,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  return {
    handleSave,
    handleChange,
  };
}
