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

	infeccion = FactoryGirl.create(:infeccion, { nombre: 'unNombre', ascitis: FactoryGirl.create(:ascitis, :non_realized),
												hemocultivos: FactoryGirl.create(:hemocultivos, :pos), 
												urocultivo: FactoryGirl.create(:urocultivo) })

	medicacion_ingreso = FactoryGirl.create(:medicacion_ingreso)
	Epicrisis.create({ infeccion: infeccion, medicacion_ingreso: medicacion_ingreso })
