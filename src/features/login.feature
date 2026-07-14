Feature: Login
  As a shopper
  I want to log into the sample store app
  So that I can access the product catalog

  Background:
    Given the app has launched

  @smoke @login
  Scenario: Successful login with valid credentials
    Given I am on the login screen
    When I log in with username "demouser" and password "testingisfun99"
    Then I should be redirected to the product list screen

  @login
  Scenario Outline: Login with different valid users
    Given I am on the login screen
    When I log in with username "<username>" and password "<password>"
    Then I should be redirected to the product list screen

    Examples:
      | username  | password       |
      | demouser  | testingisfun99 |
      | demouser2 | testingisfun99 |
