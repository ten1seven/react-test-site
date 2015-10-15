//import { Router, Route, Link } from 'react-router';

/*
  --------------------
  carousel
  --------------------
*/

"use strict";

function Slide(props) {
  return React.createElement("img", { alt: "", src: props.image });
}

var Carousel = React.createClass({
  displayName: "Carousel",

  render: function render() {
    var slides = this.props.slides.map(function (slide) {
      return React.createElement(Slide, { image: slide.image, key: slide.name });
    });

    return React.createElement(
      "section",
      { className: "carousel" },
      slides
    );
  }
});

/*
  --------------------
  products
  --------------------
*/

/*
  nav
*/

var PageNavButton = React.createClass({
  displayName: "PageNavButton",

  showProducts: function showProducts() {
    var classes = 'product-section ' + this.props.slug;

    var products = this.props.products.map(function (product) {
      return React.createElement(ProductListItem, { image: product.image, name: product.name, desc: product.desc, extra: product.extra, key: product.name });
    });

    ReactDOM.render(React.createElement(
      "section",
      { className: classes },
      React.createElement(
        "div",
        { className: "wrapper" },
        React.createElement(
          "h3",
          null,
          this.props.category
        ),
        React.createElement(
          "ul",
          { className: "product-list" },
          products
        )
      )
    ), document.querySelector('.products'));
  },

  render: function render() {
    return React.createElement(
      "li",
      null,
      React.createElement(
        "button",
        { className: "page-nav__button", onClick: this.showProducts },
        this.props.category
      )
    );
  }
});

var ProductNav = React.createClass({
  displayName: "ProductNav",

  render: function render() {
    var links = [];
    var lastCategory = null;
    var productList = this.props.products;

    productList.forEach(function (product) {
      if (product.category !== lastCategory) {

        var category = product.category;
        var productArray = [];

        productList.forEach(function (product) {
          if (category === product.category) productArray.push(product);
        });

        links.push(React.createElement(PageNavButton, { category: category, slug: product.categorySlug, products: productArray, key: product.category }));
      }
      lastCategory = product.category;
    });

    return React.createElement(
      "nav",
      { className: "page-nav" },
      React.createElement(
        "div",
        { className: "wrapper" },
        React.createElement(
          "h2",
          { className: "sr-only" },
          "Page Navigation"
        ),
        React.createElement(
          "ul",
          null,
          links
        )
      )
    );
  }
});

/*
  product display
*/

var ProductListItem = React.createClass({
  displayName: "ProductListItem",

  showProduct: function showProduct(event) {
    event.preventDefault();

    console.log(this.props.name);
  },
  render: function render() {
    return React.createElement(
      "li",
      { className: "product" },
      React.createElement(
        "a",
        { href: "#", onClick: this.showProduct },
        React.createElement("img", { alt: "", src: this.props.image }),
        React.createElement(
          "h4",
          { className: "sr-only" },
          this.props.name
        ),
        React.createElement(
          "span",
          { className: "sr-only" },
          this.props.desc
        ),
        React.createElement(
          "span",
          { className: "product__extra" },
          this.props.extra
        )
      )
    );
  }
});

var ProductSection = React.createClass({
  displayName: "ProductSection",

  render: function render() {
    return React.createElement("div", { className: "products" });
  }
});

/*
  --------------------
  render
  --------------------
*/

var Content = React.createClass({
  displayName: "Content",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Carousel, { slides: SLIDES }),
      React.createElement(ProductNav, { products: BEERS }),
      React.createElement(ProductSection, null)
    );
  }
});

ReactDOM.render(React.createElement(Content, null), document.getElementById('content'));