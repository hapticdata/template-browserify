PUBLIC=public
VIEWS=views/*.jade
NODE_MODULES=./node_modules

BROWSERIFY=$(NODE_MODULES)/browserify/bin/cmd.js
WATCHIFY=$(NODE_MODULES)/watchify/bin/cmd.js
JADE=$(NODE_MODULES)/jade/bin/jade.js

# Browserify arguments
BROWFLAGS=--debug -t jadeify javascripts/index.js -o $(PUBLIC)/bundle.js
# Compass arguments
COMPFLAGS=--sourcemap --debug-info --sass-dir=sass --css-dir=public


pre-build:
	mkdir -p $(PUBLIC)


browserify: pre-build
	$(BROWSERIFY) $(BROWFLAGS) ${ARGS}

watchify: pre-build
	$(WATCHIFY) $(BROWFLAGS) ${ARGS}

jade:
	$(JADE) $(VIEWS) --out $(PUBLIC)/ --obj locals.json --pretty ${ARGS}

jade-watch:
	${MAKE} ARGS="--watch" jade

compass:
	compass compile $(COMPFLAGS)

compass-watch:
	compass watch $(COMPFLAGS)

# Serve with sketchplate
serve:
	sketchplate hooks ./public -s


# Kickoff all watch tasks in parallel
watch: 
	${MAKE} -j5 watchify jade-watch compass-watch serve

build: jade browserify compass
	

.PHONY: all
