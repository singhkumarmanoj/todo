export default function TodoList({ tasks, removeTask }: { tasks: string[], removeTask: (index: number) => void }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
        <li key={index} className="flex justify-between w-60 bg-green-700 shadow p-3 rounded">
          <span>{task}</span>
          <button
            onClick={() => removeTask(index)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
