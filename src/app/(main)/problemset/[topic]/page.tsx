type Props = {
  params: { topic: string };
};

const ProblemTopicPage = ({ params }: Props) => {
  return <main>ProblemTopicPage : {params.topic}</main>;
};

export default ProblemTopicPage;
