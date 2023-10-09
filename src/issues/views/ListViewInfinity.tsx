import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces";
import { useIssuesInfinity } from "../hooks";

export const ListViewInfinity = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssuesInfinity({
    state,
    labels: selectedLabels,
  });

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChaged={(newState) => setState(newState)}
          />
        )}
        <div className="d-flex mt-2 justify-content-between aling-items-center">
          <button
            className="btn btn-outline-primary"
            disabled={!issuesQuery.hasNextPage}
            onClick={() => issuesQuery.fetchNextPage()}
          >
            Leer mas...
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelChanged={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
