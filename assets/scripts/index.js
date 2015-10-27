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
  product navigation
*/

var ProductNavButton = React.createClass({
  displayName: "ProductNavButton",

  render: function render() {
    var className = "page-nav__button";
    if (this.props.selected) className += " -selected";

    return React.createElement(
      "li",
      null,
      React.createElement(
        "button",
        { className: className, "data-index": this.props.dataIndex, key: this.props.dataIndex, onClick: this.props.clickHandler },
        this.props.category
      )
    );
  }
});

var ProductNav = React.createClass({
  displayName: "ProductNav",

  render: function render() {
    var links = [];

    for (var i = 0; i < this.props.data.length; i++) {
      var product = this.props.data[i];

      links.push(React.createElement(ProductNavButton, { key: i, category: product.category, clickHandler: product.clickHandler, dataIndex: product.dataIndex, selected: product.selected }));
    }

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

    alert(this.props.data.name + ' ' + this.props.data.desc);
  },

  render: function render() {
    var result = this.props.data;

    return React.createElement(
      "li",
      { className: "product" },
      React.createElement(
        "a",
        { href: "#", onClick: this.showProduct },
        React.createElement("img", { alt: "", src: result.image, height: "300", width: "300" }),
        React.createElement(
          "h4",
          { className: "sr-only" },
          result.name
        ),
        React.createElement(
          "span",
          { className: "sr-only" },
          result.desc
        ),
        React.createElement(
          "span",
          { className: "product__extra" },
          result.extra
        )
      )
    );
  }
});

var ProductList = React.createClass({
  displayName: "ProductList",

  render: function render() {
    return React.createElement(
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
        this.props.data.map(function (result) {
          return React.createElement(ProductListItem, { key: result.id, data: result });
        })
      )
    );
  }
});

/*
  products component
*/

var Products = React.createClass({
  displayName: "Products",

  getInitialState: function getInitialState() {
    return {
      selectedIndex: 0
    };
  },

  productSwitcher: function productSwitcher(event) {
    this.setState({
      selectedIndex: parseInt(event.target.getAttribute('data-index'), 10)
    });
  },

  categoryName: function categoryName() {
    return this.props.products[this.state.selectedIndex].category;
  },

  categoryList: function categoryList() {
    var links = [];
    var lastCategory = null;
    var productList = this.props.products;

    for (var i = 0; i < productList.length; i++) {
      var product = productList[i];

      if (product.category !== lastCategory) {
        links.push({
          'category': product.category,
          'clickHandler': this.productSwitcher,
          'dataIndex': i,
          'selected': this.state.selectedIndex === i ? true : false
        });
      }

      lastCategory = product.category;
    }

    return links;
  },

  productList: function productList() {
    var productArray = [];
    var products = this.props.products;
    var categorySlug = products[this.state.selectedIndex].categorySlug;

    for (var i = 0; i < products.length; i++) {
      var product = products[i];

      if (product.categorySlug === categorySlug) {
        productArray.push({
          'category': product.category,
          'desc': product.desc,
          'extra': product.extra,
          'id': i,
          'image': product.image,
          'name': product.name
        });
      }
    }

    return productArray;
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(ProductNav, { data: this.categoryList() }),
      React.createElement(
        "section",
        { className: "product-section" },
        React.createElement(ProductList, { category: this.categoryName(), data: this.productList() })
      )
    );
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
      React.createElement(Products, { products: BEERS })
    );
  }
});

ReactDOM.render(React.createElement(Content, null), document.getElementById('content'));