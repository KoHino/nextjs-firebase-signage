import { Button, Grid, Paper, Typography, Box, FormControlLabel, Checkbox } from "@mui/material"
import { useRouter } from "next/router";
import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import { setContentOrder } from "../../utilities/setContentData";
import { getContentDataClient } from "../../utilities/getContentDataClient";
import { useOrderContext } from "./OrderContext";


function ManageContentsView() {
  // display / hidden : 表示/非表示コンテンツのArray
  const [display, setDisplay] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [contents_list, setContentsList] = useState({});

  // tempDisplay / tempHidden : display / hiddenに対しての一時的な変更を保持するMap
  const [tempDisplay, setTempDisplay] = useState(new Map());
  const [tempHidden, setTempHidden] = useState(new Map());
  const { orderId } = useOrderContext();

  useEffect(() => {
    async function featchData() {
      if (orderId == null) return;
      const obj = await getContentDataClient(`/order/${orderId}`);
      const display_filtered = obj["set1"].filter(obj => Object.keys(obj).length);
      const hidden_filtered = obj["hidden"].filter(obj => Object.keys(obj).length);
      setDisplay(display_filtered);
      setHidden(hidden_filtered);
    }
    featchData();
  }, [orderId])

  useEffect(() => {
    const displayMap = new Map();
    // displayのディープコピーを作成しないとdisplayMapの変更と連動してしまう
    const tmpDisplay = display.map(obj => ({ ...obj }));
    tmpDisplay.forEach((elem, i) => {
      displayMap.set("d" + i, elem);
    })
    setTempDisplay(displayMap);

    const hiddenMap = new Map();
    const tmpHidden = hidden.map(obj => ({ ...obj }));
    tmpHidden.forEach((elem, i) => {
      hiddenMap.set("h" + i, elem);
    })
    setTempHidden(hiddenMap);

  }, [display, hidden])
  const router = useRouter();

  const changeTempDisplay = (e, key) => {
    if (!e.target.value) return;
    //tmpDisplayのディープコピーを作成して変更を加える
    const tmp = new Map();
    [...tempDisplay.keys()].forEach(elem => {
      tmp.set(elem, tempDisplay.get(elem));
    });

    const targetObj = tmp.get(e.target.name);
    targetObj[key] = Number(e.target.value);
    tmp.set(e.target.name, targetObj);
    setTempDisplay(tmp);
  };

  const changeTempHidden = (e, key) => {
    if (!e.target.value) return;
    //tmpDisplayのディープコピーを作成して変更を加える
    const tmp = new Map();
    [...tempHidden.keys()].forEach(elem => {
      tmp.set(elem, tempHidden.get(elem));
    });

    const targetObj = tmp.get(e.target.name);
    targetObj[key] = Number(e.target.value);
    tmp.set(e.target.name, targetObj);
    setTempHidden(tmp);
  };

  const onClickSubmit = async () => {
    let sortedDisplay = [...tempDisplay.values()];
    sortedDisplay.sort((a, b) => {
      return a.order - b.order;
    })
    sortedDisplay.forEach((elem, index) => {
      sortedDisplay[index]["order"] = index;
    })

    const submitObj = { ...contents_list, "set1": sortedDisplay, "hidden": [...tempHidden.values()] };
    await setContentOrder(orderId, submitObj);
    router.reload();
  }

  const onClickReload = () => {
    let sortedDisplay = [...tempDisplay.values()];
    sortedDisplay.sort((a, b) => {
      return a.order - b.order;
    })
    sortedDisplay.forEach((elem, index) => {
      sortedDisplay[index]["order"] = index;
    })
    setDisplay(sortedDisplay);
  }

  const onChangeCheckBox = (name) => {
    const [target, index] = [name[0], Number(name.slice(1))];

    if (target === "d") {
      setHidden([display[index], ...hidden]);
      setDisplay(display.filter((_, i) => i !== index));
    } else {
      const sortedArr = [...display, hidden[index]];
      sortedArr.sort((a, b) => {
        return a.order - b.order;
      })
      setDisplay(sortedArr);
      setHidden(hidden.filter((_, i) => i !== index));
    }
  }

  const createContentCard = (name, content, i, eventHandler, checked) => {
    if (content === null || content === undefined) return;
    return (
      <Paper sx={{ height: 1 / 5, m: 1 }} key={"key" + i}>
        <Grid container>
          <Grid item xs={1} style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "2rem" }}>
            <FormControlLabel
              label="表示"
              labelPlacement="top"
              control={<Checkbox name={name + i} checked={checked} onChange={(e) => onChangeCheckBox(e.target.name)} />} />
          </Grid>
          <Grid item xs={3}>
            {content.type === "image" ?
              <img
                src={content.path}
                style={{ width: "30vh", objectFit: "contain", margin: "1rem" }}
                alt='image file' />
              :
              <video
                src={content.path}
                style={{ width: "30vh", objectFit: "contain", margin: "1rem" }}
                muted autoPlay loop playsInline />
            }
          </Grid>
          <Grid item xs={8} container>
            <Grid item>
              <Typography>ファイル名: {content.fileName}</Typography>
            </Grid>
            <Grid item container direction="column">
              <Grid item style={{ display: "flex" }}>
                <Typography style={{ width: "20%", height: "33%" }}>
                  表示順:
                </Typography>
                <input
                  type="text"
                  style={{ width: "20%", height: "50%" }}
                  name={name + i}
                  placeholder={content.order}
                  onInput={(event) => eventHandler(event, "order")} />
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <Typography style={{ width: "20%", height: "33%" }}>表示時間(ms): </Typography>
                <input
                  type="text"
                  style={{ width: "20%", height: "50%" }}
                  name={name + i}
                  placeholder={content.viewTime}
                  onInput={(event) => eventHandler(event, "viewTime")} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }

  return (
    <>
      <Box>
        <Typography>並び替え</Typography>
        <Button variant="contained" sx={{ m: 1 }} onClick={onClickSubmit}>送信</Button>
        <Button variant="contained" onClick={onClickReload}>更新</Button>
      </Box>

      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Typography>ー 表示コンテンツ</Typography>
        {display.map((content, i) => (
          createContentCard("d", content, i, changeTempDisplay, true)
        ))}
        <Typography>ー 非表示コンテンツ</Typography>
        {hidden.map((content, i) => (
          createContentCard("h", content, i, changeTempHidden, false)
        ))}
      </Box>
    </>
  );
}

export default ManageContentsView;