class Infeccion < ActiveRecord::Base
	attr_accessible :nombre, :antibiotico_usado, :shock_septico, :curacion
	has_one :ascitis, :autosave => true
	has_one :hemocultivos, :autosave => true
	has_one :urocultivo, :autosave => true
	has_many :cultivos
	belongs_to :epicrisis
end