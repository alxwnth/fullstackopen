import StatisticsLine from "./StatisticsLine";

const Statistics = ({ total, ratings }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <h2>statistics</h2>
        <StatisticsLine text="good" value={ratings[0]} />
        <StatisticsLine text="neutral" value={ratings[1]} />
        <StatisticsLine text="bad" value={ratings[2]} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine
          text="average"
          value={(ratings[0] - ratings[2]) / total}
        />
        <StatisticsLine
          text="positive"
          value={(ratings[0] * 100) / total + "%"}
        />
      </>
    );
  }
};

export default Statistics;
