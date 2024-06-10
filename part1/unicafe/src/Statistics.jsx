const Statistics = ({ total, ratings }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <p>good {ratings[0]}</p>
        <p>neutral {ratings[1]}</p>
        <p>bad {ratings[2]}</p>
        <p>all {total}</p>
        <p>average {(ratings[0] - ratings[2]) / total || 0}</p>
        <p>positive {(ratings[0] * 100) / total || 0}%</p>
      </>
    );
  }
};

export default Statistics;
