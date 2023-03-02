import { useEffect, useRef } from 'react'
import styles from '../styles/Sinage.module.css'
import { getContentDataAdmin, getOrderIdAdmin } from '../utilities/getContentDataAdmin';

export async function getServerSideProps({ query }) {
  const areaId = query.areaId ?? "0";
  //areaIdからContents/(DocId) ⇒ orderId取得
  let orderId = await getOrderIdAdmin(areaId);

  const order_list = await getContentDataAdmin(orderId);
  const contents_list = order_list["set1"];
  return {
    props: {
      contents_list,
    }
  };
}

export default function Signage({ contents_list }) {

  function viewSlide(contentElements, slidNo = -1) {
    if (contentElements === undefined || contentElements.length === 0) {
      return;
    }

    if (slidNo >= 0) {
      contentElements[slidNo].style.opacity = 0;
    }
    slidNo++;
    if (slidNo >= contentElements.length) {
      slidNo = 0;
    }
    contentElements[slidNo].style.opacity = 1;
    return setInterval(() => { viewSlide(contentElements, slidNo) }, contents_list[slidNo] ? contents_list[slidNo].viewTime : 2000);
  }

  const divElement = useRef();

  useEffect(() => {
    const id = viewSlide(divElement.current.children);
    return () => clearInterval(id);
  });

  //ToDo: コンテンツ表示調節画面から変更できるようにする
  const prop_height = "100vh"
  const prop_width = "100vh"
  const prop_marginT = "auto"
  const prop_marginL = "auto"

  return (
    <div style={{ width: "100%", minHeight: "100vh", overflow: "hidden", margin: "0" }}>
      <div ref={divElement} style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: prop_height, width: prop_width, marginTop: prop_marginT, marginLeft: prop_marginL, marginRight: "auto"
      }}>
        {contents_list.map((content, i) => {
          if (content.type === "image") {
            return <img key={String(i)}
              className={styles.content_img}
              src={contents_list[i].path}
              layout='fill'
              alt='image file' />
          } else {
            return <video key={String(i)}
              className={styles.content_video}
              src={contents_list[i].path}
              muted autoPlay loop playsInline />
          }
        })}
      </div>
    </div>

  )
}

