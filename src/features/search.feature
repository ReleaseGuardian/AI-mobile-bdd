Feature: Product Search
  As a logged-in shopper
  I want to search the product catalog
  So that I can quickly find items I'm interested in

  Background:
    Given the app has launched
    And I am logged in as "demouser" with password "testingisfun99"

  @smoke @search
  Scenario: Search for an existing product
    Given I am on the product list screen
    When I search for "iPhone"
    Then I should see "iPhone 12" in the product results

  @search
  Scenario: Search for a product that does not exist
    Given I am on the product list screen
    When I search for "NonExistentProductXYZ"
    Then no products should be displayed
