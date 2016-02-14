var app = angular.module('th.slideDeck', []);

app.directive('slideDeck', function($timeout, $compile){
    return {
        restrict: 'EA',
        replace: true,
        require: ['slideDeck'],
        controller: ['$scope', function(scope){
            var self = this;
            this.index = 0;
            this.images = [];
            
            this.update = function(direction){
                var current = self.images[ self.index ];
                    current.addClass('hidden');
                // Increment Index
                direction === 'next' ? self.index ++ : self.index--;
                // Verify Index integrity
                if (self.index >= self.images.length) self.index = 0;
                else if (self.index < 0) self.index = self.images.length -1;
                // Scroll Next
                var next = self.images[ self.index ];
                    next.removeClass('hidden');
                
            };
            
            this.add = function(image) {
                // Add Image to 
                this.images.push( image );
            };
            
            this.play = function() {
                this.images[0].removeClass('hidden');
            };
            
            this.fadeOutEl = function( elem, Class ) {
                var that = this;
                console.log("Class", Class);
                elem.removeClass('animated slideOutRight slideInLeft slideOutLeft slideInRight').animate()
                .addClass('animated').addClass( Class ).delay(100).queue(function(next){
                    next();
                    return that;
                });
                
                return this;
            };
            
            this.fadeInEl = function( elem, Class ) {
                var that = this;
                console.log("Class", Class);
                elem.removeClass('animated slideOutRight slideInLeft slideOutLeft slideInRight').animate()
                .addClass('animated slideInLeft').addClass( Class ).delay(100).queue(function(next){
                    next();
                    return that;
                });
                
                return this;
            };
            
            this.next = function(elem){ self.update('next');};
            this.back = function(elem){ self.update('back');};
            
            scope.images = this.images;
            scope.index = this.index;
            
            window.slideDeck = this;
            
        }],
        link: function( scope, elem, attrs, ctrls ) {
            console.log("SlideDeck", ctrls);
            var self = ctrls[0];
            var slideshow = window.mylide = window.slidr.create( 'slideDeck', {
                timing: { 'linear': '0.4s cubic-bezier(1.000, 0.225, 0.475, 0.875)' },
                touch: true,
                controls: 'none',
                transition: 'linear',
                fade: true,
                overflow: true
            } );
            
            var hammertime = new window.Hammer(elem[0]);
            
            scope.next = function(){ 
                if (self.index < scope.stores.length - 1) self.index++;
                else self.index = 0;
                slideshow.slide( "store-" + self.index);
                // console.log("Going To", "store-" + self.index, self.index)
            };
            scope.back = function( ){ 
                if (self.index > 0) self.index--;
                else self.index = scope.stores.length -1;
                slideshow.slide( "store-" + self.index);
                // console.log("Going To", "store-" + self.index, self.index)
            };
            
            hammertime.on('swipe', function(ev) {
                var direction = ev.offsetDirection === 2 ? 'left' : 'right';
                // console.log("Direction", direction);
                direction === 'left' ? scope.back() : scope.next();
            });
            
            // Play The Animation
            $timeout(function(){
                self.play();
                slideshow.start();
            }, 100);
            
        }
    };
});

app.directive('slideDeckSlide', function(){
    return {
        restrict: 'EA',
        replace: true,
        require: ['slideDeckSlide', '^slideDeck'],
        controller: ['$scope', function(scope){
            
        }],
        link: function( scope, elem, attrs, ctrls ) {
            console.log("SlideDeckSlide", arguments);
            var self = ctrls[0];
            var parent = ctrls[1];
            // Hide Image By Default
            elem.addClass('hidden');
            // Add element to Images Array
            parent.add(elem);
        }
    };
});