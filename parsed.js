title("カウンター");
style({
  body: {
    fontFamily: "sans-serif",
    padding: "2em",
  },
});
route("/", () => {
  return view(() =>
    div(h1({}, "こんにちは"), button({ onclick: "alert('hi')" }, "Click!"))
  );
});
