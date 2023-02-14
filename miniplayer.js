//used constants
const $ = document.querySelector.bind(document);
const cd = $(".player_cd");

function Microne(parent_el) {
  this.audio = null;
  this._src_ = null;
  this._events_ = [];
  this.is_playing = false;

  this.p_char = "\u25B6";
  this.s_char = "\u2759" + "&nbsp" + "\u2759";

  //creating animation with jquery and it pauses to start with the music
  const cdAnimate = cd.animate([{ transform: "rotate(360deg)" }], {
    duration: 10000, // 10 seconds
    iterations: Infinity,
  });
  cdAnimate.pause();
  
  this.el = document.createElement("div");
  _apply_style(this.el, {
    width: "100%",
    height: "100%",
    border: "0px solid #000",
    cursor: "auto",
    position: "relative",
  });

  this.fill_el = document.createElement("div");
  _apply_style(this.fill_el, {
    background: "#141414",
    height: "100%",
    width: "0%",
    opacity: "0.25",
    pointerEvents: "none",
  });
  this.el.appendChild(this.fill_el);

  this.play_button = document.createElement("div");
  this.play_button.innerHTML = this.p_char;
  _apply_style(this.play_button, {
    cursor: "pointer",
    fontFamily: "helvetica",
    fontSize: "2.5em",
    position: "absolute",
    top: "101%",
    left: "48%",
    width: "0%",
    height: "0%",
    color: "#f7f7f7",
    textAlign: "center",
    fontWeight: "bold",
  });
  this.el.appendChild(this.play_button);

  this.init = function () {
    parent_el.appendChild(this.el);
    this.el.addEventListener("click", el_click);
    this.play_button.addEventListener("click", play_click);
  };

  this.source = function (src, preload) {
    this._src_ = src;
    if (preload !== false) {
      this.audio = new Audio(src);
      this.audio.addEventListener("timeupdate", time_update);
      this.audio.addEventListener("ended", audio_ended);
    }
  };

  this.play = function () {
    if (!this.audio && this._src_) {
      this.source(this._src_);
      this._apply_events_();
    }

    this.is_playing = true;
    this.audio.play();
    this.play_button.innerHTML = this.s_char;
    this.el.style.cursor = "pointer";
  };

  this.pause = function () {
    this.is_playing = false;
    this.audio.pause();
    this.play_button.innerHTML = this.p_char;
    this.el.style.cursor = "auto";
  };

  this._apply_events_ = function () {
    for (var i in this._events_) {
      this.audio.addEventListener(this._events_[i].e, this._events_[i].h);
    }
    this._events_ = [];
  };

  this.on = function (e, h) {
    this._events_.push({ e, h });
    if (this.audio) {
      this.audio.addEventListener(e, h);
    }
  };

  var t = this;

  function _apply_style(dom_elem, style) {
    Object.assign(dom_elem.style, style);
  }

  function el_click(e) {
    e.preventDefault();

    if (e.target != t.play_button && t.is_playing) {
      var rect = t.el.getBoundingClientRect();
      x = e.pageX - rect.left;
      t.audio.currentTime =
        (t.audio.duration * ((x * 100) / t.el.offsetWidth)) / 100;
    }
  }

  function play_click(e) {
    e.preventDefault();

    if (t.is_playing) {
      t.pause();
	  //stop the animation of the cd
	  cdAnimate.pause()
    } else {
      t.play();
	  //start the animation of the cd
	  cdAnimate.play();
    }
  }

  function time_update(e) {
    var at = ((t.audio.currentTime * 100) / t.audio.duration).toFixed(3);
    t.fill_el.style.width = at + "%";
  }

  function audio_ended() {
    t.pause();
	//stop the animation of the cd
	cdAnimate.pause()
    t.audio.currentTime = 0;
    t.fill_el.style.width = "0%";
  }

  this.init();
  return this;
}
