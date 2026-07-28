import CountUp from "react-countup";

function Stats() {
  return (
    <div className="text-white bg-black p-20 text-center">
      <h1>
        <CountUp end={10000} duration={3} />
      </h1>
      <p>CountUp Working</p>
    </div>
  );
}

export default Stats;