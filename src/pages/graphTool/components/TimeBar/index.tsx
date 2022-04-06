// styles for Timebar
const styles = {
  root: {
    background: '#fafafa',
    display: 'flex',
    position: 'absolute',
    bottom: '0px',
    left: '68px',
    right: '28px',
  },
  itemContainer: {
    height: '100px',
    flex: 1,
    background: 'rgb(250, 250, 250)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  itemBar: {
    height: '100%',
    margin: '0px 42%',
    background: '#ddd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  itemTime: {
    position: 'relative',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
};

const TimeBar = (props: any) => {
  const {
    data = [
      { time: '2020-3-21', nodeCount: 10 },
      { time: '2020-3-22', nodeCount: 14 },
      { time: '2020-3-23', nodeCount: 20 },
      { time: '2020-3-24', nodeCount: 30 },
      { time: '2020-3-25', nodeCount: 30 },
      { time: '2020-3-26', nodeCount: 30 },
      { time: '2020-3-27', nodeCount: 30 },
      { time: '2020-3-28', nodeCount: 30 },
      { time: '2020-3-29', nodeCount: 30 },
    ],
    onChange = () => {},
    style = {},
  } = props;
  const maxHeight = data.reduce((acc, curr) => {
    return Math.max(acc, curr.nodeCount);
  }, 0);

  const handleClick = (timeStamp) => {
    onChange(timeStamp);
  };

  return (
    <div>
      <ul style={{ ...styles.root, style }}>
        {data.map((c) => {
          return (
            <li
              key={c.time}
              style={styles.itemContainer}
              onClick={() => {
                handleClick(c);
              }}
            >
              <div style={styles.itemBar}>
                <div
                  style={{
                    height: `${(c.nodeCount / maxHeight) * 100}%`,
                    background: '#873bf4',
                  }}
                ></div>
              </div>
              <div style={styles.itemTime}>{c.time}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
