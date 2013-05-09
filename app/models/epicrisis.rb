class Epicrisis < ActiveRecord::Base
	attr_accessible :dni, :nro_historia_clinica, :fecha_ingreso, :fecha_egreso, :infeccion
	has_one :infeccion, :autosave => true
end