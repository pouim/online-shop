import { Button } from "@components/button/button";
import classNames from "classnames";
import styles from "./styles.module.scss";
import React, { FC } from "react";

interface DeleteDialogProps {
  onSubmitClick: () => void;
  onCancelClick: () => void;
  id? : any | null;
}

const DeleteDialog: FC<any> = ({
  onSubmitClick,
  onCancelClick,
}) => {
  return (
    <div className={classNames(styles.container, " p-5")}>
      <div className={classNames(styles.title, "mb-3 text-center")}>
        آیا از حذف این نشانی اطمینان دارید؟
      </div>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <Button onClick={onSubmitClick} size="small" className="px-5 mr-3">
          تایید
        </Button>
        <Button onClick={onCancelClick} size="small" className="px-5">
          لغو
        </Button>
      </div>
    </div>
  );
};

export default DeleteDialog;
