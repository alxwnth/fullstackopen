const Statistics = ({ total, ratings }) => {
  return (
    <>
      <p>all {total}</p>
      <p>average {(ratings[0] - ratings[2]) / total || 0}</p>
      <p>positive {(ratings[0] * 100) / total || 0}%</p>
    </>
  );
};

export default Statistics;
