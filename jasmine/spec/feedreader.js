$(function() {

    // Tests definitions and contents of the allFeeds variable
    describe('RSS Feeds', function() {

        // Test whether allFeeds has been defined and is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Tests whether the URL for each feed has been defined and is not empty
        it('has URL defined for each feed', function() {
            for (var i = 0, j = allFeeds.length; i < j; i++) {
                expect(allFeeds[i].url).toBeTruthy();
            }
        })

        // Tests whether the name variable for each feed has been defined and is not empty
        it('has defined name for each feed', function() {
            for (var i = 0, j = allFeeds.length; i < j; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
            }
        })
    });


    // Tests the functionality of hiding/revealing the menu sidebar
    describe('The menu', function() {

        // Checks whether the body has .menu-hidden class on page load
        it('is hidden by default', function() {
            expect($('body').attr('class')).toContain('menu-hidden');
        });

        // Simulates a click on .menu-icon-link and test whether the 
        // menu-hidden class is toggled
        it('hides when clicked', function() {
            $('.menu-icon-link').click()
            expect(document.body.className).not.toContain('menu-hidden')
            $('.menu-icon-link').click()
            expect(document.body.className).toContain('menu-hidden')
        });

    });

    // Tests the loadFeed function actually populations the the .feed element
    // with .entry elmements
    describe('Initial Entries', function() {

        // Loads in the feed before the check is run
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Stores the number of .entry elements with .feed as a parent and 
        // then tests that that number is greater than 0.
        it('creates .entry elements in the .feed container', function() {
            var length = $('.feed .entry').length;
            expect(length).toBeGreaterThan(0);
        });

    })

    // Tests whether the loadFeed function changes the content of the .feed element

    describe('New Feed Selection', function() {

        // Variables that will hold the html content before and after the feed is changed
        var articlesBefore;
        var articlesAfter;

        // Loads the first feed and stores the html in articlesBefore.  Then, it 
        // loads a second feed and stores the html in articlesAfter.
        beforeEach(function(done) {
            loadFeed(0, function() {
                articlesBefore = $('.feed').html();
                loadFeed(2, function() {
                    articlesAfter = $('.feed').html();
                    done();
                });
            });
        });

        // Compare the contents of the feed before and after loadFeed
        it('changes content', function() {
            expect(articlesBefore).not.toEqual(articlesAfter);
        });
    })
}());