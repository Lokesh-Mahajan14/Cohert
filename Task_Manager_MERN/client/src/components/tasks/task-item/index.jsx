import CommonButton from "@/components/common-button";
import CommonCard from "@/components/common-card";

function TaskItem({
  item,
  handleDelete,
  setShowDialog,
  setCurrentEditedId,
  taskFormData,
}) {
  function handleEdit() {
    setShowDialog(true);
    setCurrentEditedId(item?._id);

    taskFormData.setValue("title", item?.title);
    taskFormData.setValue("description", item?.description);
    taskFormData.setValue("status", item?.status);
    taskFormData.setValue("priority", item?.priority);
  }

  return (
    <CommonCard
      title={item?.title}
      description={item?.status}
      footerContent={
        <div className="flex gap-3 justify-center">
          <CommonButton
            type="button"
            onClick={handleEdit}
            buttonText="Edit"
          />
          <CommonButton
            type="button"
            onClick={() => handleDelete(item?._id)}
            buttonText="Delete"
          />
        </div>
      }
    />
  );
}

export default TaskItem;
