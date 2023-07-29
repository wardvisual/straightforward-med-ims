const Dashboard = () => {
  const data = [
    {
      count: 432,
      name: `New Medicines`,
      imagePath: `/assets/arts/nurse-art-1.svg`,
    },
    {
      count: 321,
      name: `Upcoming Medicines`,
      imagePath: `/assets/arts/nurse-art-2.svg`,
    },
    {
      count: 211,
      name: `Expired Medicines`,
      imagePath: `/assets/arts/nurse-art-3.svg`,
    },
    {
      count: 553,
      name: `Total Medicines`,
      imagePath: `/assets/arts/nurse-art-4.svg`,
    },
  ];

  const _ = [
    {
      stocks: [
        {
          title: "Stocks",
        },
      ],
    },
  ];
  return (
    <>
      <div className="wrapper --left">
        <div className="header">
          <h4>Dashboard Overview</h4>
          <hr />
        </div>

        <div className="dashboard__overview">
          <div className="analytics">
            {data.map((el, i) => (
              <div key={i} className="analytic">
                <img src={`${el.imagePath}`} alt="image" />
                <div>
                  <h1>{el.count}</h1>
                  <p>{el.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="indepth">
            <div>
              <div className="header">
                <h5>
                  <span>Low Stock Levels</span>
                </h5>
              </div>

              <ul>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
              </ul>
            </div>

            <div>
              <div className="header">
                <h5>
                  <span>Low Quantity Levels</span>
                </h5>
              </div>

              <ul>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
              </ul>
            </div>

            <div>
              <div className="header">
                <h5>
                  <span>Expired Medicines</span>
                </h5>
              </div>

              <ul>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
                <li>Lorem ipsum dolor sit, amet consectetur </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
