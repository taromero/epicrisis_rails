# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

	Epicrisis.all.each{ |epicrisis| 
		epicrisis.delete()
	}

	infeccion = FactoryGirl.create(:infeccion, { nombre: 'unNombre', ascitis: FactoryGirl.create(:ascitis, :non_realized) })
	Epicrisis.create({ infeccion: infeccion })
