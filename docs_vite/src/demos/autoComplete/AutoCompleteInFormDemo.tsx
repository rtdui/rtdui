import { AutoComplete, TextInput, Button } from "@rtdui/core";

const fruits = [
  "Apple",
  "Banana",
  "Cabbage",
  "Dates",
  "Endive",
  "Fennel",
  "Garlic",
  "Hominy",
  "Iceberg Lettuce",
  "Jicama",
  "Kale",
  "Lemons",
  "Madarins",
  "Napa",
  "Oranges",
  "Pears",
  "Quince",
  "Radicchio",
  "Shallots",
  "Tangelo",
  "Ugli Fruit",
  "Watermelon",
  "Yams",
  "Zucchini Squash",
];

export default function AutoCompleteInFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(Object.fromEntries(formData.entries()));
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput name="input1" placeholder="this is text input" />
      <AutoComplete
        name="input2"
        options={fruits}
        placeholder="this is autocomplete"
      />
      <Button type="submit" className="btn">
        submit
      </Button>
    </form>
  );
}
