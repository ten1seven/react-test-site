/*
  --------------------
  carousel
  --------------------
*/

var Slide = React.createClass({
  render: function() {
    return (
      <img alt="" src={this.props.image} />
    );
  }
});

var Carousel = React.createClass({
  render: function() {
    var slides = [];

    this.props.slides.forEach(function(slide) {
      slides.push(<Slide image={slide.image} key={slide.name} />);
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

var PageNavLink = React.createClass({
  render: function() {
    return (
      <li>
        <a href="#TODO">{this.props.category}</a>
      </li>
    );
  }
});

var ProductNav = React.createClass({
  render: function() {
    var links = [];
    var lastCategory = null;

    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        links.push(<PageNavLink category={product.category} slug={product.slug} key={product.category} />);
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
  product sections
*/

var ProductListItem = React.createClass({
  render: function() {
    return (
      <li className="product">
        <a href="#">
          <img alt="" src={this.props.image} />
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
    var products = [];
    var category = this.props.category;
    var classes = 'product-section ' + this.props.slug;

    this.props.products.forEach(function(product) {
      if (product.category === category) {
        products.push(<ProductListItem image={product.image} name={product.name} desc={product.desc} extra={product.extra} key={product.name} />);
      }
    });

    return (
      <section className={classes}>
        <div className="wrapper">
          <h3>{this.props.category}</h3>
          <ul className="product-list">{products}</ul>
        </div>
      </section>
    );
  }
});

var ProductSections = React.createClass({
  render: function() {
    var sections = [];
    var lastCategory = null;

    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        sections.push(<ProductSection products={BEERS} category={product.category} slug={product.categorySlug} key={product.category} />);
      }
      lastCategory = product.category;
    });

    return (
      <div className="products">
        <h2 className="sr-only">Products</h2>
        {sections}
      </div>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div>
        <Carousel slides={SLIDES} />
        <ProductNav products={BEERS} />
        <ProductSections products={BEERS} />
      </div>
    );
  }
});


/*
  --------------------
  render
  --------------------
*/

ReactDOM.render(
  <Content />,
  document.getElementById('content')
);
