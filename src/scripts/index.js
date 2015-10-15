//import { Router, Route, Link } from 'react-router';

/*
  --------------------
  carousel
  --------------------
*/

function Slide(props) {
  return (<img alt="" src={props.image} />);
}

var Carousel = React.createClass({
  render: function() {
    var slides = this.props.slides.map(function(slide) {
      return (<Slide image={slide.image} key={slide.name} />);
    });

    return (
      <section className="carousel">
        {slides}
      </section>
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
  showProducts: function() {
    var classes = 'product-section ' + this.props.slug;

    var products = this.props.products.map(function(product) {
      return (<ProductListItem image={product.image} name={product.name} desc={product.desc} extra={product.extra} key={product.name} />);
    });

    ReactDOM.render(
      <section className={classes}>
        <div className="wrapper">
          <h3>{this.props.category}</h3>
          <ul className="product-list">{products}</ul>
        </div>
      </section>
    , document.querySelector('.products'));
  },

  render: function() {
    return (
      <li>
        <button className="page-nav__button" onClick={this.showProducts}>{this.props.category}</button>
      </li>
    );
  }
});

var ProductNav = React.createClass({
  render: function() {
    var links = [];
    var lastCategory = null;
    var productList = this.props.products;

    productList.forEach(function(product) {
      if (product.category !== lastCategory) {

        var category = product.category;
        var productArray = [];

        productList.forEach(function(product) {
          if (category === product.category) productArray.push(product);
        });

        links.push(<PageNavButton category={category} slug={product.categorySlug} products={productArray} key={product.category} />);
      }
      lastCategory = product.category;
    });

    return (
      <nav className="page-nav">
        <div className="wrapper">
          <h2 className="sr-only">Page Navigation</h2>
          <ul>{links}</ul>
        </div>
      </nav>
    );
  }
});


/*
  product display
*/

var ProductListItem = React.createClass({
  showProduct: function(event) {
    event.preventDefault();

    console.log(this.props.name);
  },
  render: function() {
    return (
      <li className="product">
        <a href="#" onClick={this.showProduct}>
          <img alt="" src={this.props.image} height="300" width="300" />
          <h4 className="sr-only">{this.props.name}</h4>
          <span className="sr-only">{this.props.desc}</span>
          <span className="product__extra">{this.props.extra}</span>
        </a>
      </li>
    );
  }
});

var ProductSection = React.createClass({
  render: function() {
    return (
      <div className="products" />
    );
  }
});


/*
  --------------------
  render
  --------------------
*/

var Content = React.createClass({
  render: function() {
    return (
      <div>
        <Carousel slides={SLIDES} />
        <ProductNav products={BEERS} />
        <ProductSection />
      </div>
    );
  }
});

ReactDOM.render(
  <Content />,
  document.getElementById('content')
);
