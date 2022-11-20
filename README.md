# Development

### Link to Deployed Website

https://sadarmadillo123.github.io/development/

### Goal and Value of the Application

The goal of the application is to allow users to add items to their cart for a potential checkout at a bakery.
It provides value to a user since it displays different types of information about each item to allow for a more informed
checkout process.

### Usability Principles Considered

In terms of layout, I divided the page into two clear sections. The left side of the page is responsible for filtering and displaying cart items, whereas the right hand side contains the store items and store cards. The filters positioned on the left is naturally where the user eyes are drawn to first (reading left-to-right), which might help them recognize the abililty to use filtering/searching/add to cart features before interacting with the store section. I also put the cart section below the filters in the left-hand sections for a few reasons. First, the cart changes size based on the number of items present, which would be jarring if it pushed the filters down. Additionally the cart naturally makes sense to be positioned under the filter, since it is one of the last action steps (checking the cart) before checkout.

In terms of visual hiearchy, I used heading fonts to distinguish the sections mentioned above. Additionally, items in these sections are given white backgrounds for contrast against the page's general grey background to draw user attention towards those items. Each item card has a larger header to allow the user to more easily scan the items for what they are interested in.

### Organization of Components

The app contains two main divs that hold the left and right page divs.

Left Page Div:
Nested within the left page div, are two smaller divs. The first div holds the MUI RadioButtons and Checkboxes which the user can interact with.
The second div holds the cart information (which initially is just price $0.00). It is dynamically updated with additional paragraph elements based on the state of the cart.

Right Page Div:
The right page div, contains a MUI Grid. The Grid component has Grid Items which each take 6 columns (half of the grid size) or 12 columns (the width of the grid) depending on the screen width. Each Grid Item contains a MUI Card with fields that are set based on the bakeryData.json file. The right div
is the larger portion of the screen.

### How Data is Passed Down Through Components

Data is passed through props to components.

The RadioGroupButton takes in a function (setCriteria) from the main App and uses the setCriteria function to update the active sortCriteria when a
specific Radio Button within the group is pressed.

The Checkbox components take 8 pieces of data. There are 4 pieces of data related to setting up the title/labels. There are two groups of three checkboxes so formName, label1, label2, label3 set up these values that are displayed to screen. 3 pieces of data correspond to the value
that the items filter on. Since in the Dairy/Gluten/Nut case, the actual string we filter for is Gluten-Free/Nut-Free/Dairy-Free, we set value labels
that are different from the text labels displayed in the filter. The last prop passed in is the actual filtering method, which determines how updateFilter method is called by the checkbox as different boxes are checked/unchecked.

### How the User Triggers State Changes

The user triggers state changes mainly in three different scenarios.

If an add/remove button is clicked, this triggers a state change. Clicking an add/remove button triggers a function (either addToCart or removeFromCart)
and each of these functions potentially updates two states. These are the state related to the cart (list of objects of the form [item-name: count in cart])
and the state related to the current price of cart items.

If a radio button is selected, this triggers a state change. Selecting a radio button triggers the setCriteria function which sets a certain criteria (which is a string). There is a compareFunc function which generates a sorting criteria based on the criteria (the current string-value) and this is used to sort the items before they are displayed.

If a checkbox is selected, this triggers a state change. Selecting a checkbox triggers its associated updateFilters() function, which either
is the updateTypesFilters or updateDietFilters function. The updateTypesFilters checks the state of the checkboxes and creates a filter list which includes
the previous dietFilters (since they are unchanged) and filters based on the current states of the type checkbox group. The same is done for the
updateDietFilters except the previous typeFilters are now preserved, and new filters are added based on the state of the diet checkbox group.
The whole set of filters is used to filter the bakeryData (which support filtering on mlutiple different values at once).
