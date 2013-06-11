using = (name, values, func) ->
	i = 0
	count = values.length

	while i < count
		if Object::toString.call(values[i]) isnt "[object Array]"
			values[i] = [values[i]]
		func.apply this, values[i]
		jasmine.currentEnv_.currentSpec.description += "\n (with \"" + name + "\" using " + values[i].join(", ") + ")"
		i++