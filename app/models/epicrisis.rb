class Epicrisis < ActiveRecord::Base
	attr_accessible :dni, :nro_historia_clinica, :fecha_ingreso, :fecha_egreso
	has_one :infeccion, :procedimiento_invasivo, :hemorragiaDigestivaAlta
end