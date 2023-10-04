import { FC } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";
import { Props } from "../interfaces/props";

export const LabelPicker: FC<Props> = ({ selectedLabels, onLabelChanged }) => {
  const labelsQuery = useLabels();
  if (labelsQuery.isLoading) return <LoadingIcon />;
  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "label-active" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onLabelChanged(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
