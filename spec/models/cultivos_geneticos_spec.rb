require 'spec_helper'

describe CultivoGenerico do

	['', nil].each do |name|
	  	it "should not validate a cultivo whose name is #{name}" do
	  		cultivo = CultivoGenerico.new()
	  		cultivo.nombre = name
	  		cultivo.valid?.should eq false
	  		cultivo.errors[:nombre][0].should eq "can't be blank"
	  	end
	end

end