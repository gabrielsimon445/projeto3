interface ActionBarProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  addLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

const ActionBar = ({
  onAdd,
  onEdit,
  onDelete,
  addLabel = "Adicionar",
  editLabel = "Editar",
  deleteLabel = "Excluir",
  showAdd = true,
  showEdit = true,
  showDelete = true,
}: ActionBarProps) => {
  return (
    <div className="flex gap-4 items-center bg-blue-700 p-4 text-white">
      {showAdd && (
        <button
          onClick={onAdd}
          className="bg-white px-4 py-2 rounded hover:bg-gray-300 text-black"
        >
          {addLabel}
        </button>
      )}
      {showEdit && (
        <button
          onClick={onEdit}
          className="bg-white px-4 py-2 rounded hover:bg-gray-300 text-black"
        >
          {editLabel}
        </button>
      )}
      {showDelete && (
        <button
          onClick={onDelete}
          className="bg-white px-4 py-2 rounded hover:bg-gray-300 text-black"
        >
          {deleteLabel}
        </button>
      )}
    </div>
  );
};

export default ActionBar;
