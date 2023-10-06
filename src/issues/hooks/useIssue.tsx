import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../interfaces";
import { sleep } from "../../helpers/sleep";

export const getIssue = async (numberIssue: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${numberIssue}`);
  //console.log(data);
  return data;
};

export const getIssueComment = async (
  numberIssue: number
): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${numberIssue}/comments`
  );

  return data;
};

export const useIssue = (numberIssue: number) => {
  const issueQuery = useQuery(["issue", numberIssue], () =>
    getIssue(numberIssue)
  );

  const commentsQuery = useQuery(
    ["issue", numberIssue, "comments"],
    () => getIssueComment(issueQuery.data!.number),
    {
      enabled: issueQuery.data !== undefined,
    }
  );
  return { issueQuery, commentsQuery };
};
