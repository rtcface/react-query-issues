import { FC } from "react";
import { Issue, State } from "../interfaces";
import { IssueItem } from "./IssueItem";
interface Props {
  issues: Issue[];
  state?: State;
  onStateChaged: (state?: State) => void;
}
export const IssueList: FC<Props> = ({ issues, state, onStateChaged }) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${!state ? "active" : ""}`}
              onClick={() => onStateChaged()}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Open ? "active" : ""}`}
              onClick={() => onStateChaged(State.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Closed ? "active" : ""}`}
              onClick={() => onStateChaged(State.Closed)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
          />
        ))}
      </div>
    </div>
  );
};
