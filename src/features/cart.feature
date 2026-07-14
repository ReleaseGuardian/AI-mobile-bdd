Feature: Shopping Cart
  As a logged-in shopper
  I want to add products to my cart
  So that I can purchase them later

  Background:
    Given the app has launched
    And I am logged in as "demouser" with password "testingisfun99"

  @smoke @cart
  Scenario: Add a single product to the cart
    Given I am on the product list screen
    When I open the product "iPhone 12"
    And I add the product to the cart
    Then the cart should contain 1 item

  @cart
  Scenario: Add multiple products to the cart
    Given I am on the product list screen
    When I add the following products to the cart:
      | iPhone 12  |
      | Galaxy S20 |
    Then the cart should contain 2 items
