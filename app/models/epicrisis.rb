class Epicrisis < ActiveRecord::Base
	attr_accessible :dni, :nro_historia_clinica, :fecha_ingreso, :fecha_egreso,
					:infeccion, :medicacion_ingreso
	has_one :infeccion, autosave: true
	has_one :medicacion_ingreso, autosave: true
end