class MedicacionIngreso < ActiveRecord::Base
  attr_accessible :antibiotico_profilactico, :espironolactona, :furosemida, :propranolol
  belongs_to :epicrisis
end
