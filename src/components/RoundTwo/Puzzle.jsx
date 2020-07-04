import React, { Fragment, useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ReactPlayer from "react-player";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import v1 from "../../assets/round2/BarryMissingStatue.png";
import v2 from "../../assets/round2/FranklinJLG.png";
import v3 from "../../assets/round2/FranklinPaintingBenjaminWest.png";

const useStyle = makeStyles((theme) => ({
  playerStyle: {
    marginTop: "32px",
    marginBottom: "32px",
  },
  continerStyle: {
    marginTop: "32px",
  },
  imageContainer: {
    marginTop: "32px",
  },
  imageViewer: {
    height: 700,
    width: 500,
  },
  descriptionStyle: {
    fontSize: "1.2rem",
    alignSelf: "start",
    margin: "16px",
  },
}));

function Puzzle() {
  const classes = useStyle();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const photos = [
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2FBarryMissingStatue.png?alt=media&token=0f7e7855-d792-4d9a-9331-cedfc99b42f4",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2Fpainting_franklinstudy.jpg?alt=media&token=c5ac3d30-f9a0-493d-b5db-fcb3db777687",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2Fv2.jpg?alt=media&token=b2956769-e411-45fa-9f4c-3b45d8b227fa",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2FFranklinJLG.png?alt=media&token=b0da0cd7-2270-4ba9-96c3-76e03dd32818",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2Fv3.jpg?alt=media&token=73e337d0-3d6c-45f6-9589-fa793ab3a92d",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2FFranklinPaintingBenjaminWest.png?alt=media&token=f2054be1-e228-4d4a-a463-8818786149a0",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2FMasonTemple.png?alt=media&token=95d02d4a-2568-488c-a5de-222b94370352",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2FMissingStatue_ColoredSoldiers.png?alt=media&token=3da64d2c-9d37-4392-8272-87ab4bcf9700",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2FMissingStatue_Tomb.png?alt=media&token=4a9606e7-782b-4011-a66e-f4b699a224cb",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2Fv1.jpg?alt=media&token=0a66a722-8c4f-4934-9665-3785f3ed81d0",
      width: 1,
      height: 1,
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2FSinger%20Statue%20Missing.png?alt=media&token=eff8b66c-3458-46f9-a674-03ea11a9f229",
      width: 1,
      height: 1,
    },

    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/buzzle-hub.appspot.com/o/round2%2Fpainting_rockwell.jpg?alt=media&token=aa89d529-c286-4085-80da-b6b2eceea374",
      width: 1,
      height: 1,
    },
  ];

  const getMediaForLightBox = () => {
    if (currentImage === 2) {
      return (
        <Grid item>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=mvfzveYvvY8&feature=youtu.be"
            className={classes.playerStyle}
            width={950}
            height={500}
          />
        </Grid>
      );
    } else if (currentImage === 4) {
      return (
        <Grid item>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=fDSnu3s2gwE&feature=youtu.be"
            className={classes.playerStyle}
            width={950}
            height={500}
          />
        </Grid>
      );
    } else if (currentImage === 9) {
      return (
        <Grid item>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=y1FUNbxD10s&feature=youtu.be"
            className={classes.playerStyle}
            width={950}
            height={500}
          />
        </Grid>
      );
    } else {
      return (
        <img
          src={photos[currentImage].src}
          height={750}
          width={600}
          alt="images"
        />
      );
    }
  };
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <Fragment>
      <Grid
        conatiner
        xs={12}
        md={8}
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.continerStyle}
      >
        <Grid item>
          <ReactPlayer
            url="https://youtu.be/G7Gdu5LeY7o"
            className={classes.playerStyle}
            width={950}
            height={500}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            Directions: You'll be creating and sharing your works of art through
            Google Slides and your homeroom's FlipGrid page. The more people in
            your group participate, the more points you will score. You'll get a
            bonus too if you're wearing Lab gear!
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            Part 1: Imitating Art:
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            You'll be creating and posting your works of art through Google
            Slides.{" "}
            <a
              href="https://www.youtube.com/watch?v=rUhYAnJDtik&feature=youtu.be"
              target="_blank"
            >
              Watch this two-minute video{" "}
            </a>
            to learn how!
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            Then, make a copy of this{" "}
            <a
              href="https://docs.google.com/presentation/d/1lcYSrWjWa_sJcIZY8O9l2ns5wTMoLE8vF_LCbwtSbOE/edit?usp=sharing"
              target="_blank"
            >
              Google Slides template
            </a>
            , retitle it with your homeroom + group names, and share it with
            your homeroom teacher and ochase@labmiddleschool.com.
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            Part 2: Hamilton Lip Sync Battle
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            For the lip sync challenge, there are three video options:{" "}
            <a
              href="https://www.youtube.com/watch?v=y1FUNbxD10s&feature=youtu.be"
              target="_blank"
            >
              Timeline Error 1
            </a>
            ,{" "}
            <a
              href="https://www.youtube.com/watch?v=fDSnu3s2gwE&feature=youtu.be"
              target="_blank"
            >
              Timeline Error 2
            </a>
            , and{" "}
            <a
              href="https://www.youtube.com/watch?v=mvfzveYvvY8&feature=youtu.be"
              target="_blank"
            >
              Timeline Error 3
            </a>
            .
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            Check out Ms Chase's example on your homeroom's FlipGrid page and
            post your version there, too.
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            701/702:{" "}
            <a href="https://flipgrid.com/a850c1d4" target="_blank">
              Click here!
            </a>{" "}
            (
            <a href="https://flipgrid.com/a850c1d4" target="_blank">
              https://flipgrid.com/a850c1d4
            </a>
            )
            <br />
            703/704:{" "}
            <a href="https://flipgrid.com/c7e40ee9" target="_blank">
              Click here!
            </a>{" "}
            (
            <a href="https://flipgrid.com/c7e40ee9" target="_blank">
              https://flipgrid.com/c7e40ee9
            </a>
            )
            <br />
            705/706:{" "}
            <a href="https://flipgrid.com/57472123" target="_blank">
              Click here!
            </a>{" "}
            (
            <a href="https://flipgrid.com/57472123" target="_blank">
              https://flipgrid.com/57472123
            </a>
            )
            <br />
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.descriptionStyle}>
            May the odds be ever in your favor!
          </Typography>
        </Grid>
        <Gallery
          photos={photos}
          onClick={openLightbox}
          className={classes.imageContainer}
        />
        ;
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox} className={classes.imageViewer}>
              {getMediaForLightBox()}
            </Modal>
          ) : null}
        </ModalGateway>
      </Grid>
    </Fragment>
  );
}

export default Puzzle;
